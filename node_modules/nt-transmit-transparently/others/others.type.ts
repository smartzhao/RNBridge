import * as React from 'react'

export interface PropsDefine {

}

export class PropsGaea {

}

export class Props extends PropsGaea implements PropsDefine {

}

export interface StateDefine {
    others?: any
}

export class State implements StateDefine {
    others = {}
}
