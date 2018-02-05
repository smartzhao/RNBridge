import * as React from 'react'
import {observer} from 'mobx-react'
import Transmittransparently from '../index'

@observer
export default class Demo extends React.Component <any, any> {
    static title = '透传忽略'
    static description = ``

    render() {
        const props = {
            areYourSure: true,
            onClick: null as any,
            onMouseOver: null as any
        }

        return (
            <div>
                <p>
                    传入 props: {JSON.stringify(props)}
                </p>
                <TestTransmitTransparently {...props}/>
            </div>
        )
    }
}

@Transmittransparently('onClick')
class TestTransmitTransparently extends React.Component <any, any> {
    static defaultProps = {
        onMouseOver: null as any
    }

    render() {
        return (
            <div>接收到 props: {JSON.stringify(this.props)}</div>
        )
    }
}