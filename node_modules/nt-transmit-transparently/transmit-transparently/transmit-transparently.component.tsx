import * as React from 'react'
import * as typings from './transmit-transparently.type'
import others from '../others/others'

export default (...ignore: string[]) => (Target: any) => {
    class Transmit extends React.Component<typings.PropsDefine, typings.StateDefine> {
        static defaultProps: typings.PropsDefine = new typings.Props()
        public state: typings.StateDefine = new typings.State()

        private displayName = 'TransmitTransparently'
        private wrappedInstance: React.ReactInstance

        public render(): React.ReactElement<any> {
            const newProps: any = Object.assign({}, this.props)
            newProps.others = others(Target.defaultProps, newProps, ignore)
            newProps.ref = ((ref: React.ReactInstance) => {
                    this.wrappedInstance = ref
                }
            )
            return React.createElement(Target, newProps, this.props.children)
        }
    }

    const func: any = () => {
        return Transmit
    }

    return func()
}