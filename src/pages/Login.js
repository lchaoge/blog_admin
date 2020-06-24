import React,{useState} from 'react'
import 'antd/dist/antd.css'
import {Card,Input,Icon,Button,Spin,message,notification} from 'antd'
import '../static/css/login.css'

import servicePath from '../config/apiUrl'
import axios from 'axios'

const Login = (props) => {
  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [isLogin,setIsLogin] = useState(false)

  const checkLogin = () => {
    setIsLogin(true)
    if(!userName){
      message.error('用户名不能空')
      setTimeout(() => {
        setIsLogin(false)
      },500);
      return false
    }else if(!password){
      message.error('密码不能空')
      setTimeout(() => {
        setIsLogin(false)
      },500);
      return false
    }
    let dataProps = {
      userName,
      password
    }
    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true,
    }).then(res=>(res.data)).then(res=>{
      setTimeout(() => {
        setIsLogin(false)
      },500);
      
      if(res.code === '0000'){
        localStorage.setItem('openId',res.data.openId)
        props.history.push('/index')
      }else{
        message.error(res.msg)
      }
    }).catch(error=>{
      notification['error']({
        message: '系统错误',
        description: error,
      });
      setIsLogin(false)
    })
  }

  return (
    <div className="login-div">
      <Spin tip="loading..." spinning={isLogin}>
        <Card title="chaoge blog system" bordered={true} style={{width:400}}>
          <Input id="userName" size="large" placeholder="请输入用户名" onChange={(e)=>{setUserName(e.target.value)}} />
          <br/>
          <br/>
          <Input.Password id="password" size="large" placeholder="请输入密码" onChange={(e)=>{setPassword(e.target.value)}} />
          <br/>
          <br/>
          <Button type="primary" size="large" block onClick={checkLogin} loading={isLogin}>登陆</Button>
        </Card>
      </Spin>
    </div>
  )
}

export default Login