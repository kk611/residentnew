import React from 'react'
import { Icon, Calendar, Card, Avatar ,Row ,Col} from 'antd';
const { Meta } = Card;   

function onPanelChange(value, mode) {
  console.log(value, mode);
}

class Cal extends React.PureComponent {

  render(){
    return(
      <Row >
        <Col span={12} >
          <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
            <Calendar  fullscreen={false} onPanelChange={onPanelChange} />
          </div>
        </Col>
        <Col span={12}>
          <Card
            style={{ width: 300 }}
            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
          >
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title="I LOVE POLAR"
              description="polar bear"
            />
          </Card>
        </Col>
      </Row>
      
    )
  }
}

export default Cal