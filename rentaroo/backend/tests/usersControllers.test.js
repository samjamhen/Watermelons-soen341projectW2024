const mongoose = require('mongoose');
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/users');
const User = require('../models/users');

describe('User Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!',
        userType: 'client',
        phoneNumber: '123-456-7890'
      };
      req.body = newUser;

      jest.spyOn(User, 'create').mockResolvedValue(newUser);

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining(newUser));
    });

    it('should handle error if user not created', async () => {
      const newUser = {
        // User data missing, should trigger error
      };
      req.body = newUser;

      jest.spyOn(User, 'create').mockResolvedValue(null);

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not created' });
    });
  });


  describe('getUsers', () => {
    it('should return all users', async () => {
        const users = [
            {name: 'Test User1', email: 'testuser1@gmail.com', password: 'Password123!', userType: 'client', phoneNumber: '123-456-7899'},
            {name: 'Test User2', email: 'testuser2@gmail.com', password: 'Password123!', userType: 'client', phoneNumber: '123-456-7819'}
        ];
        jest.spyOn(User, 'find').mockResolvedValue(users);

        await getUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(users);
    });

    it('should handle error if no users found', async () => {
        jest.spyOn(User, 'find').mockResolvedValue(null);
  
        await getUsers(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'No users found' });
      });
  });


  describe('getUser', () => {
    it('should return a user by id', async () => {
        req.params = {
            id: '1234'
        };
        const user = {
            _id: '1234',
            name: 'Test User',
            email: 'test@example.com',
            password: 'Password123!',
            userType: 'client',
            phoneNumber: '123-456-7890'
        };

        jest.spyOn(User, 'findById').mockResolvedValue(user);

        await getUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(user);
    });

    it('should handle error if user not found', async () => {
        req.params = {
            id: '123'
        };
        
        jest.spyOn(User, 'findById').mockResolvedValue(null);

        await getUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({error: 'User not found'});
    });
  });


  describe('updateUser', () => {
    it ('should update an existing user', async () => {
        req.params = {
            id: '1234'
        };

        const updatedUserData = {
            name: 'Updated User',
            email: 'update@gmail.com',
            password: 'Password123!',
            phoneNumber: '514-911-911',
            userType: 'client'
        };
        req.body = updatedUserData

        jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValueOnce(updatedUserData);

        await updateUser(req,res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(updatedUserData)
    });

    it ('should handle error if user not found', async () => {
        req.params = {
            id: 'does_not_exist'
        }

        const updatedUserData = {
            name: 'Updated User',
            email: 'update@gmail.com',
            password: 'Password123!',
            phoneNumber: '514-911-911',
            userType: 'client'
        };
        req.body = updatedUserData;

        jest.spyOn(User,'findByIdAndUpdate').mockResolvedValueOnce(null);

        await updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({error: 'User not found'});
    });
  });


  describe('deleteUser', () => {
    it ('should delete an existing user', async () => {
        req.params = {
            id: '1234'
        };

        const user = {
            _id: '1234',
            name: 'Test User',
            email: 'test@example.com',
            password: 'Password123!',
            userType: 'client',
            phoneNumber: '123-456-7890'
        };
        req.body = user;

        jest.spyOn(User, 'findByIdAndDelete').mockResolvedValueOnce(user);

        await deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({message: 'User deleted successfully'})
    });

    it ('should handle error if user not found', async () => {
        req.params = {
            id: 'does_not_exist'
        }

        const user = {
            name: 'Delete User',
            email: 'delete@gmail.com',
            password: 'Password123!',
            phoneNumber: '514-911-9111',
            userType: 'client'
        };
        req.body = user;

        jest.spyOn(User, 'findByIdAndDelete').mockResolvedValueOnce(null);

        await deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({error: 'User not found'});
    });
  });

});
