import {Injectable} from 'angular2/core';


@Injectable()
export class Logger {

    constructor() { }

    log(msg) {
        console.log(msg);
    }

    info(msg){
        console.info(msg)
    }

    warn(msg){
        console.warn(msg)
    }

    debug(msg){
        console.debug(msg)
    }

    error(msg){
        console.error(msg)
    }
}
