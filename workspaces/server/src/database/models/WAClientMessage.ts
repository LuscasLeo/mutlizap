import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import WAClientSession from "./WAClientDetails";

@Entity('waclients_message')
export default class WAClientMessage {
    
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    from: string;
    
    @Column()
    text: string;

    @ManyToOne(() => WAClientSession, ({messages}) => messages)
    session: WAClientSession;
    
}