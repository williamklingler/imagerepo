import Head from 'next/head';
import React from 'react';
import Dropzone from 'react-dropzone'
import styles from '../styles/Home.module.css'
import uploadStyles from '../styles/Upload.module.css'
import url from "../include/url"
import request from "superagent";

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      message: '',
      fileSelected: false,
      fileName: '',
       imageURLs: [],
     };
  }
  handleUpload = (files) => {
    if(files.length == 0){
      this.setState({message: 'Please upload a valid image file.'});
      return;
    }
    else this.setState({message: ''});
    const req = request.post(url + '/api/fileUpload');
    console.log(files);
    for (const file of files) {
      req.attach(file.name, file);
    }
    req.end();
    this.fetchImageURLs();
  }
  deleteImages = (e, urls) =>{
    e.preventDefault();
    if(!Array.isArray(urls)){
      urls = [urls];
    }
    request
    .post(url + "/api/delete")
    .send({urls: urls})
    .end();
    let stateUrls = this.state.imageURLs;
    console.log(urls);
    console.log(stateUrls)
    urls.forEach((imageUrl, i) => {
      stateUrls.splice(imageUrl.indexOf(url),1);
    });
    this.setState({urls: stateUrls});
  }
  fetchImageURLs = () => {
    fetch(url + "/api/images", {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: {}})
    })
    .then((res) => {return res.json()})
    .then(data => {
      this.setState({imageURLs: data.images});
    })
  }
  componentDidMount(){
    this.fetchImageURLs();
  }
  render(){
    return (
      <div className={styles.container}>
        <Head>
          <title>Image Repo </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a>ImageRepo!</a>
          </h1>
          <div className={styles.description}>
            <p> Click on an image to delete it </p>
          </div>
        <div className={uploadStyles.subcontainer}>
          <Dropzone accept="image/*" onDrop={this.handleUpload}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()} className={uploadStyles.dragndrop}>
                    <input {...getInputProps()} />
                    <img className={uploadStyles.upload}
                      src="/upload.png"
                    ></img>
                      <p style={{margin: '0'}}>{this.state.fileSelected ? 'File Selected: ' + this.state.fileName : "Drag & Drop or Click to Browse"}</p>
                      <p style={{color: 'red'}}>{this.state.message}</p>

                  </div>
                </section>
              )}
            </Dropzone>
          </div>
            <button onClick={this.fetchImageURLs}> Reload Images </button>
          <div className={styles.grid}>
          <>{ this.state.imageURLs.map((url, i) => (
            <a className={styles.card} onClick={e => this.deleteImages(e, url)}>
              <img src={url}/>
            </a>
          )
        )
        }</>
          </div>
        </main>

      </div>
    )
  }
}
