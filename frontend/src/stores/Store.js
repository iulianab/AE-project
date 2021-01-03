import axios from 'axios'
import {EventEmitter} from 'fbemitter'

const SERVER = 'http://3.21.171.218:3001'

class Store{
    constructor(){
        this.content = []
        this.emitter = new EventEmitter()
    }
    async getAll(){
        try {
            let response = await axios(`${SERVER}/products`)
            this.content = response.data
            this.emitter.emit('GET_ALL_SUCCESS')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('GET_ALL_ERROR')
        }
    }
    async addOne(client){
        try {
            await axios.post(`${SERVER}/clients`, client)
            this.emitter.emit('ADD_SUCCESS_CLIENT')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('ADD_ERROR')
        }
    }
    async emitFinish(){
        try {
            this.emitter.emit('FINISH')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('ADD_ERROR')
        }
    }
    async addOneOrder(firstName, lastName, currentDate){
        try {
            await axios.post(`${SERVER}/order/${firstName}/${lastName}`, {'order_date': currentDate})
            this.emitter.emit('ADD_SUCCESS_ORDER')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('ADD_ERROR')
        }
    }
    async addOneOrderRow(firstName, lastName, productId, orderDate, quantity){
        try {
            await axios.post(`${SERVER}/orderrow/${firstName}/${lastName}/${productId}/${orderDate}`, {'quantity': quantity})
            this.emitter.emit('ADD_SUCCESS_ORDER_ROWS')
            this.getAll()
        } catch (e) {
            console.warn(e)
            this.emitter.emit('ADD_ERROR')
        }
    }
}

export default Store