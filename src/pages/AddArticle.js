import React,{useState,useEffect} from 'react'
import marked from 'marked'
import '../static/css/addArticle.css'
import { Row,Col,Input,Select,Button,DatePicker,message } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const {Option} = Select
const {TextArea} = Input


const AddArticle = (props) => {

  useEffect(() => {
    getTypeInfo()
  }, [])

  const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle,setArticleTitle] = useState('')   //文章标题
  const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate,setShowDate] = useState()   //发布日期
  const [updateDate,setUpdateDate] = useState() //修改日志的日期
  const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType,setSelectType] = useState(1) //选择的文章类别

  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  }); 

  const changeContent = (e) => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)

  }

  const getTypeInfo = () => {
    axios({
      method: 'get',
      url:servicePath.getTypeInfo,
      withCredentials: true,
    }).then(res=>res.data).then(res=>{
      if(res.code==="0000"){
        setTypeInfo(res.data)
      }else{
        localStorage.removeItem('openId')
        props.history.push('/')
      }
    })
  }

  const selectTypeHandler = (value) => {
    setSelectType(value)
  }

  const saveArticle = () => {
    if(!selectedType){
      message.error('请选择文章类型')
      return false
    }else if(!articleTitle){
      message.error('请选择文章名称')
      return false
    }else if(!articleContent){
      message.error('请选择文章内容')
      return false
    } else if(!introducemd){
      message.error('请选择文章简介')
      return false
    }else if(!showDate){
      message.error('请选择发布日期')
      return false
    }
    
    let dataProps = {
      type_id: selectedType,
      title: articleTitle,
      article_content: articleContent,
      introduce: introducemd,
      addTime: showDate,
      id: articleId === 0 ? undefined : articleId,
      view_count: articleId === 0 ? 0 : undefined,
    }
    debugger
    console.log(articleId)
    dataProps.view_count = 0
    axios({
      method: 'post',
      url: articleId === 0 ? servicePath.addArticle: servicePath.updateArticle,
      data:dataProps,
      withCredentials: true
    }).then(res=>res.data).then(res=>{
      if(res.code === '0000'){
        if(res.data.insertId){
          setArticleId(res.data.insertId)
        }
        message.success('保存成功')
        
      }else{
        message.success('保存失败')
      }
    })
    
  }

  return(
    <div className="">
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input value={articleTitle} onChange={(e)=>{setArticleTitle(e.target.value)}} placeholder="博客标题" size="large" />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select onChange={selectTypeHandler} defaultValue={selectedType} size="large">
                {typeInfo.map(item=>{
                  return(
                    <Option key={item.id} value={item.id}>{item.typeName}</Option>
                  )
                })}
              </Select>
            </Col>
          </Row>
          <br/>
          <Row gutter={10}>
            <Col span={12}>
              <TextArea className="markdown-content" rows={35} placeholder="文章内容" onChange={changeContent} />
            </Col>
            <Col span={12}>
              <div className="show-html" dangerouslySetInnerHTML={{__html:markdownContent}}></div>
            </Col>
          </Row>

        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>
              &nbsp;
              <Button onClick={saveArticle} type="primary" size="large">发布文章</Button>
              <br/>
            </Col>
            <Col span={24}>
              <br/>
              <TextArea rows={4} placeholder="文章简介" onChange={changeIntroduce} />
              <br/><br/>
              <div className="introduce-html" dangerouslySetInnerHTML={{__html:introducehtml}}></div>
              <br/>
            </Col>
            <Col span={24}>
              <div className="date-select">
                <DatePicker onChange={(data,dataString)=>{setShowDate(dataString)}} placeholder="发布日期" size="large" />
                &nbsp;
                <DatePicker onChange={(data,dataString)=>{setUpdateDate(dataString)}} placeholder="修改日期" size="large" />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle