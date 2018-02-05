import * as React from 'react'
import {observer} from 'mobx-react'
import Transmittransparently from '../index'

@observer
export default class Demo extends React.Component <any, any> {
    static title = '基本用法'
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
                    这个函数会把组件 props 中所有不合法或者已经在 defaultProps 中的对象剔除掉， 设置到 others 对象里作为 props 一个字段, 使用它可以透传安全类型的 props，且避免和已使用的 props 造成冲突。
                </p>
                <p>
                    传入 props: {JSON.stringify(props)}
                </p>
                <TestTransmitTransparently {...props}/>
            </div>
        )
    }
}

@Transmittransparently()
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