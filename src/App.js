import { format } from 'fecha';
import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import './App.css';
import EditPost from './component/EditPost';
import FormComments from './component/FormComments';
import FormLogin from './component/FormLogin';
import FormRegister from './component/FormRegister';
import NewPost from './component/NewPost';
import { auth } from './interface/auth';
import { posts } from './interface/posts';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      msg: '',
      posts: null,      
      showEditForm: false,
      showNewPostForm: false,
      showCommentsForm: false,
    };
    auth.user(this);
    posts.getAll(this);
    this.selectedPost = null;
  }
  render() {
    return (
      <Container fluid>
        <EditPost sender={this} />
        <FormComments
          show={this.state.showCommentsForm}
          sender={this}
          onClose={() => this.setState({ 'showCommentsForm': false })}          

        /> 
        <Row style={{top:0, left:0, width:'100vw', backgroundColor:'blue', color:'white'}}>
          <Col md={1}style={{ textAlign:'center'}}>Blog!</Col>
          <Col md xs={7} style={{ backgroundColor: 'green', textAlign:'center' }}>
            Bem vindo</Col>
          <Col md={3}style={{ textAlign: 'center' }}>
            {
              this.state.user != null
                ? (<b>{this.state.user.name}</b>  )
                : ('Não logado')
            }
            {
              this.state.user?.is_admin ?
              ' (Admin)' : ''
            }
          </Col>
          <Col md={1} style={{ backgroundColor: '#3366ff', color:'yellow', textAlign:'center' }}>
            {
              this.state.user ?
                <div onClick={() => auth.logout(this)}  style={{ cursor:'pointer'}} >
                  Logout
                </div> 
              : <FormLogin sender={this} />
            }
            
          </Col>
        </Row>
        <Row style={{paddingTop:'30px', backgroundColor:'#F0F0F0'}}>
          <Col>
            <h1>Blog!</h1>
            <p>Postagens incríveis de nossso editores.</p>          
          {
            this.state.user ?
                  (<div style={{ position: 'absolute', right: 0, top: 30 }}>
                    <NewPost sender={this} />
                </div>)
                : <div></div>
          }
          {
            this.state.user?.is_admin ?
                  (<div style={{ position: 'absolute', right: 0, top: 110 }}>
                    <FormRegister />
                </div>)
                : ('')
          }
          </Col>
        </Row>
        <Row>
          <Col>
            {this.listaPosts()}                
            </Col>
        </Row>
        <Row md={'auto'}>
          <Col>
          </Col>
        </Row>
        <Row style={{position:'absolute', bottom:0, left:0, width:'100vw'}}>
          <Col style={{ backgroundColor: '#BABABA'}}>
            Msg: <span style={{color:'red'}}>{this.state.msg}</span>
          </Col>
        </Row>
      </Container>
    );
  }
  listaPosts() {
    var p;
    if (this.state.user) {
      p = this.state.posts?.filter(post => post.user_id === this.state.user.id);
    } else {
      p = this.state.posts;
    }
    if (p) {
      return p.map((post, index) => {
        return (
          <div key={index}>
            <div style={{display:'flex'}}>
              <div><h2>{post.title}</h2></div>
              {this.state.user ?
                (<>
                  <div onClick={() => posts.destroy(post.id, this)} style={{ marginTop: '10px', cursor: 'pointer' }} title="Excluir">                    
                  🗑️
                </div>
                  <div onClick={() => {
                    this.setState({ 'showEditForm': true });
                    this.selectedPost = post;
                  }
                  } style={{ marginTop: '10px', cursor: 'pointer' }} title="Editar">
                  ✒️
                </div>
                </>
                )
                
                : ''
                }
            </div>
            <div>
                <span>{post.content}</span>
            </div>
            <hr />
            <div style={{ display: 'flex', paddingBottom: '20px', fontSize: '0.8em', fontStyle: 'italic'}}>
              <span>Postado em {format(new Date(post.created_at), 'DD/MM/YYYY HH:mm:ss')}</span>
              <span
                onClick={() => {
                  this.selectedPost = post;
                  console.log(this.selectedPost);
                  this.setState({ 'showCommentsForm': true });
                  }
                  }
                style={{ paddingLeft: '10px', cursor: 'pointer' }}
              >
                <u>Comentários: {post.comments.length}</u>
              </span>
              
              </div>
          </div>
        );
      });
    } else {
      return (<div>Nenhum post</div>);
    }
  }
}

