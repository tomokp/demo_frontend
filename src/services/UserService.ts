import axios from 'axios';
import { IUser } from '../models/IUser';

export class UserService{
    private static serverURL: string = `http://localhost:8080/api`;

    // getAll() {
    //     return http.get<Array<IUser>>("/employees")
    // }
    public static getAll(){
        let dataURL:string = `${this.serverURL}/employees`;
        return axios.get(dataURL);
    }

    public static get(id: string) {
        let dataURL:string = `${this.serverURL}/employees/${id}`;
        return axios.get(dataURL);
      }

    public static create(user: IUser) {
        let dataURL:string = `${this.serverURL}/employees`;
        return axios.post(dataURL, user);
      }
    
    public static update(user: IUser) {
        let dataURL:string = `${this.serverURL}/employees/${user.id}`;
        return axios.put(dataURL, user);
      }
    
    public static delete(id: string) {
        let dataURL:string = `${this.serverURL}/employees/${id}`;
        return axios.delete(dataURL);
      }
    public static deleteAll() {
        let dataURL:string = `${this.serverURL}/employees`;
        return axios.delete(dataURL);

      }
    public static generate(amount: number) {
      let dataURL:string = `${this.serverURL}/employees/${amount}`;
      return axios.post(dataURL);
    }
}