import dotenv from 'dotenv';
const {config}=dotenv;

// const { parsed } = config();

// const {MODE,DB_URL} = config().parsed;
var MODE=null;
var DB_URL=null;
var SECRET=null;
// console.log(config().parsed.MODE)
if(config().parsed){
    const envVar= config().parsed;
    MODE=envVar.MODE
    SECRET=envVar.SECRET
    DB_URL=envVar.DB_URL
}else{
    MODE= process.env.MODE
    DB_URL=process.env.DB_URL
    SECRET=process.env.SECRET
}



const mode = MODE === 'development';
const DB=mode?"mongodb://localhost:27017/forefest":DB_URL;

export  {
    SECRET,
    DB_URL,
    mode,
    DB,
};

