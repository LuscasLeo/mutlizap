import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import WAClientMessage from "./WAClientMessage";

@Entity("waclients_session")
export default class WAClientSession {

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    name: string;
    
    @OneToMany(() => WAClientMessage, ({session: client}) => client)
    messages: WAClientMessage;
    
    @Column()
    token: string;
    
    
}