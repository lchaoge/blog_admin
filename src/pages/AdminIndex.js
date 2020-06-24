import { Layout, Menu, Breadcrumb } from 'antd';
import React,{useState} from 'react'
import {Route} from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import '../static/css/adminIndex.css'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminIndex = (props) => {
  const [collapsed,setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const handleClickArticle = (e)=>{
    debugger
    if(e.key === 'AddArticle'){
      props.history.push('/index/add')
    } else if(e.key === 'ArticleList'){
      props.history.push('/index/list')
    } 
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleClickArticle}>
          <Menu.Item key="AddArticle" icon={<PieChartOutlined />}>
            工作台
          </Menu.Item>
          <SubMenu icon={<UserOutlined />} title="文章管理">
            <Menu.Item key="AddArticle">添加文章</Menu.Item>
            <Menu.Item key="ArticleList">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />} >
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Route path="/index/" exact component={AddArticle} />
            <Route path="/index/add" exact component={AddArticle} />
            <Route path="/index/list" exact component={ArticleList} />
            
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>chaoge.com</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex