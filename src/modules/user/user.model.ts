import {getModelForClass,prop,pre} from '@typegoose/typegoose'
import  argon2  from 'argon2'
import logger from '../../utils/logger'

@pre<User>('save',async function(next){
    if(this.isModified('password') || this.isNew){
        const hash = await argon2.hash(this.password)
        this.password = hash
    }
    return next()
})

export class User {
    @prop({required:true,unique:true})
    public username!:string

    @prop({required:true,unique:true})
    public email!:string

    @prop({required:true})
    public password!:string

    public async comparePassword(attempt:string):Promise<boolean>{
        try{
            return argon2.verify(this.password,attempt)
        }catch(error){
            logger.info(error)
            return false
        }
    }
}

export const UserModel = getModelForClass(User,{
    schemaOptions: {
        timestamps:true,
    },
}
)