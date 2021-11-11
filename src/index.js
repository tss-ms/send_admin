import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      comments:[ ],
      userName:'',
      userContent:'',
    }
  }
  componentDidMount(){
        axios.get('http://yapi.smart-xwork.cn/mock/84769/flora-test/list')
       .then(res =>{
         this.setState({
           comments:res.data
         })
       })
         .catch(err =>{
           console.log(err);
        })
        axios({
          url:"http://yapi.smart-xwork.cn/mock/84769/flora-test/add",
          method:"post",
          contentType:"application/json",
          data:{
            name:this.state.userName,
            msg:this.state.userContent,
          },
      }).then(function (response) {
          alert(response.data);
      });
      }
  
  //渲染评论列表
  renderList(){
      const {comments} = this.state;
      if(comments.length === 0){
         return <div className="no-commit">暂无评论，快去评论吧！</div>
      }
      return(
      <ul>
           {
           comments.map((item) =>(
               <li key={item.id}>
                   <h4>评论人：{item.name}</h4>
                   <p>评论内容：{item.msg}</p>
                   <p>评论时间：{item.time}</p>
               </li>
           ))}
   </ul>
   )}
//处理表单元素值
  handleForm = (e) =>{
      const {name , value} = e.target;
      this.setState({
          [name]:value
      })
  }
//发表评论
  addComment = () =>{
      const {comments,userName,userContent} = this.state;
      //非空校验
      if(userName.trim() === '' || userContent.trim() === ''){
          alert('请输入评论人和评论内容');
          return 
      }
      //将评论信息添加到state中
      const newComments = [{
          id:Math.random(),
          name:userName,
          msg:userContent,
          time:Date()
      },...comments];
      this.setState({
          comments:newComments,
          userName:'',
          userContent:'' 
      })
  }

  render(){
      const {userName,userContent} = this.state;
      return(
          <div className="app">
              <div>
                  <input className="user" type="text" placeholder="评价人：" value={userName} name="userName" onChange={this.handleForm}/>
                  <br />
                  <textarea
                     className="content"
                     cols="30"
                     rows="10"
                     placeholder="请输入评价内容"
                     value={userContent}
                     name="userContent"
                     onChange={this.handleForm}
                  ></textarea>
                  <br />
                  <button onClick={this.addComment}>发表评论</button>
              </div>
              {this.renderList()}
          </div>
      )}
}
ReactDOM.render(<App />,document.getElementById('root'));