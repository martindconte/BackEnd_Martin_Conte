import CartsDao from "../dao/manager/carts.dao.js";
import ChatDao from "../dao/manager/chat.dao.js";
import ProductsDao from "../dao/manager/products.dao.js";
import TicketDao from "../dao/manager/ticket.dao.js";
import UserDao from "../dao/manager/users.dao.js";
import CartRepository from "../repositories/Carts.repository.js";
import ChatRepository from "../repositories/Chat.repository.js";
import ProductsRepository from "../repositories/Products.repository.js";
import TicketRepository from "../repositories/Ticket.respository.js";
import UserRepository from "../repositories/User.repository.js";

export const productService = new ProductsRepository( new ProductsDao )
export const cartService = new CartRepository( new CartsDao )
export const chatService = new ChatRepository( new ChatDao )
export const userService = new UserRepository( new UserDao )
export const ticketService = new TicketRepository( new TicketDao )