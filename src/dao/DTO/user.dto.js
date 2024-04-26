export default class UserDTO {
    constructor(user) {
        this.firstName = user.first_name
        this.lastName = user.last_name
        this.age = user.age
        this.email = user.email
        this.role = user.role
        this.username = user.email
        this.cartId = user.cart.toString()
    }
}