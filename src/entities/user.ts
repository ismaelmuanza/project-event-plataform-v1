export interface UserProps {
 id?: string,
 name: string,
 email: string,
 password: string,
 created_at?: Date,
 updated_at?: Date
}

export class User {

  constructor(
   public id: string,
   public name: string,
   public email: string,
   public password: string,
   public created_at: Date,
   public updated_at: Date
  ) {}


}