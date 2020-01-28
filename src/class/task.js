class task {
    constructor(id=Date.now(),task="",isCompleted=false,time="") {

        this.id=id;
        this.task=task;
        this.isCompleted=isCompleted;
        this.time=time

    }
}
export default task;