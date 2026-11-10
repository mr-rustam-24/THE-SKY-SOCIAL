
import db from '../db.js';

export const UserModel = {
  // Find user by phone number
  async findByPhone(phone) {
    await db.read();
    return db.data.users.find((user) => user.phone === phone) || null;
  },

 
  async findByEmailOrPhone(identifier) {
    await db.read();
    const cleanPhone = String(identifier).replace(/\D/g, '');
    const cleanEmail = String(identifier).toLowerCase();

    return (
      db.data.users.find(
        (user) => user.phone === cleanPhone || (user.email && user.email === cleanEmail)
      ) || null
    );
  },

 
  async findById(id) {
    await db.read();
    return db.data.users.find((user) => user.id === id) || null;
  },

  async create({ name, phone, email = null, password = null }) {
    await db.read();

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim().toLowerCase() : null,
      password: password || null,
      created_at: new Date().toISOString()
    };

    db.data.users.push(newUser);
    await db.write();

    return newUser;
  }
};