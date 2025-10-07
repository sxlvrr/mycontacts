require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const Contact = require('./models/contact.model');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    // Nettoyer la base
    await User.deleteMany({});
    await Contact.deleteMany({});
    console.log('🗑️  Base de données nettoyée');

    // Créer l'utilisateur de démonstration
    const hashedPassword = await bcrypt.hash('Demo123456', 10);
    const demoUser = await User.create({
      email: 'demo@mycontacts.com',
      password: hashedPassword
    });
    console.log('👤 Utilisateur de démo créé : demo@mycontacts.com');

    // Créer des contacts de démonstration
    const demoContacts = [
      { firstName: 'Alice', lastName: 'Martin', phone: '0612345678', user: demoUser._id },
      { firstName: 'Bob', lastName: 'Durand', phone: '0687654321', user: demoUser._id },
      { firstName: 'Claire', lastName: 'Dubois', phone: '0698765432', user: demoUser._id }
    ];

    await Contact.insertMany(demoContacts);
    console.log('📇 Contacts de démo créés (3)');

    console.log('\n✨ Base de données initialisée avec succès !');
    console.log('\n📋 Identifiants de test :');
    console.log('   Email    : demo@mycontacts.com');
    console.log('   Password : Demo123456');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed :', error);
    process.exit(1);
  }
};

seedDatabase();
