import task from "./task";


class card{
constructor(cardId=Date.now(),cardTitle="",cardTime="",tasks){
    this.cardId=cardId;
    this.cardTitle=cardTitle;
    this.cardTime=cardTime;
    this.tasks=[];
    this.tasks.splice(this.tasks.length , 0, new task());
}
}
export default card;