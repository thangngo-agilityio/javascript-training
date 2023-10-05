// Service
import HttpsService from "../service/httpsService";

/**
 * @class UserModel
 * Manages the user data
 */
export default class LoginModel {
  constructor() {
    this.userService = new HttpsService('users');
  }

  /**
   * @description create new user account and save response to mock api
   * return user
   * @param user UserSignUp
   */
  async handleSignUp(user) {
    const newUser = {
      email: user.email,
      password: user.password
    }
    return await this.userService.post(newUser)
  }

  /**
   * @description get all users account
   * return all users
   * @param user User[]
   */
  async getAllUser() {
    return await this.userService.get();
  }
}
