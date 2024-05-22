const UserModel = require('@/src/models/User');

describe('UserModel', () => {
  describe('create', () => {
    it('should create a user and return the user ID', async () => {
      const email = 'test@example.com';
      const password_hash = 'password123';

      const userId = await UserModel.create(email, password_hash);

      expect(userId).toBeDefined();
      expect(typeof userId).toBe('string');
    });

    it('should throw an error if user creation fails', async () => {
      const email = 'test@example.com';
      const password_hash = 'password123';

      // Simulate a failure by passing an invalid email
      try {
        await UserModel.create(null, password_hash);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toContain('User creation failed');
      }
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email and return the user information', async () => {
      const email = 'test@example.com';

      const user = await UserModel.findByEmail(email);

      expect(user).toBeDefined();
      expect(user.email).toBe(email);
    });

    it('should return null if the user does not exist', async () => {
      const email = 'nonexistent@example.com';

      const user = await UserModel.findByEmail(email);

      expect(user).toBeNull();
    });

    it('should throw an error if user search fails', async () => {
      const email = 'test@example.com';

      // Simulate a failure by passing an invalid email
      try {
        await UserModel.findByEmail(null);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toContain('User search failed');
      }
    });
  });
});
