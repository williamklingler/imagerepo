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
    console.log(files);
    this.setState({fileSelected: true})
    let file = files[0];
    this.setState({fileName: file.name})
    // if(file.name.split('.')[1] != "pdf"){
    //   alert("only accepts PDFs");
    //   return;
    // }
    const req = request.post(url + '/api/fileUpload');
    files.forEach(file => {
      req.attach("userfile", file);
      // req.field('email', this.state.email);   maybe replace this with userID in future
    });
    console.log(req);
    req.end();
  }
  fetchImageURLs = () => {
    fetch(url + "/api/images")
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
          <p> remove extras from upload.module.css </p>
          <Dropzone accept="image/*" onDrop={this.handleUpload}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()} className={styles.dragndrop}>
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
            <button onClick={this.fetchImageURLs()}> Reload Images </button>
          <div className={styles.grid}>
          <>{ this.state.imageURLs.map((url, i) => (
            <img src={url} className={styles.card}/>
          )
        )
        }</>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h3>Documentation &rarr;</h3>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h3>Learn &rarr;</h3>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
              <h3>Examples &rarr;</h3>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h3>Deploy &rarr;</h3>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >

          </a>
        </footer>
      </div>
    )
  }
}
