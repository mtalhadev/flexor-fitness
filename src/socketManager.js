import { io } from "socket.io-client";
// import {SEVERT_IP} from './theme'
// import { SOCKET_IO_SERVER } from './config';
// const SOCKET_IO_SERVER = 'http://192.168.0.105:5000'
const SOCKET_IO_SERVER = 'https://flexor.is'
// const SOCKET_IO_SERVER = `http://${SEVERT_IP}:5000`

const EVENT_JOIN_ROOM = 'join-room';
const EVENT_LEAVE_ROOM = 'leave-room';
const EVENT_LIST_LIVE_STREAM = 'list-live-stream';
const EVENT_BEGIN_LIVE_STREAM = 'begin-live-stream';
const EVENT_FINISH_LIVE_STREAM = 'finish-live-stream';
const EVENT_SEND_HEART = 'send-heart';
const EVENT_SEND_MESSAGE = 'send-message';
const EVENT_PREPARE_LIVE_STREAM = 'prepare-live-stream';
const EVENT_SEND_REPLAY = 'replay';

class SocketManager {
  socket = null;

  constructor() {
    if (SocketManager.instance) {
      return SocketManager.instance;
    }
    SocketManager.instance = this;
    this.socket = io(SOCKET_IO_SERVER,{
      reconnection: true,
      transports: ['polling']
    });
    this.setupListenDefaultEvents();
    return this;
  }

  setupListenDefaultEvents() {
    // console.log('check 1', this.socket.connected);
    this.socket.on('connect', () => {
      console.log('connect');
    });
    this.socket.on('disconnect', () => {
      console.log('disconnect');
    });
  }

  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: L I S T E N   E V E N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //


  listenPrepareLiveStream(callback = () => null) {
    this.socket.on(EVENT_PREPARE_LIVE_STREAM, () => {
      // alert('om')
      console.log(`${EVENT_PREPARE_LIVE_STREAM} :`);
      return callback();
    });
  }

  listenBeginLiveStream(callback = () => null) {
    this.socket.on(EVENT_BEGIN_LIVE_STREAM, (data) => {
      console.log(`${EVENT_BEGIN_LIVE_STREAM} :`, data);
      return callback(data);
    });
  }

  listenFinishLiveStream(callback = () => null) {
    this.socket.on(EVENT_FINISH_LIVE_STREAM, (data) => {
      console.log(`${EVENT_FINISH_LIVE_STREAM} :`, data);
      return callback(data);
    });
  }

  // listenListLiveStream(callback = () => null) {
  //   this.socket.on(EVENT_LIST_LIVE_STREAM, (data) => {
  //     console.log(`${EVENT_LIST_LIVE_STREAM} :`, data);
  //     return callback(data);
  //   });
  // }

  listenSendHeart(callback = () => null) {
    this.socket.on(EVENT_SEND_HEART, () => {
      console.log(`${EVENT_SEND_HEART} :`);
      return callback();
    });
  }

  listenSendMessage(callback = () => null) {
    this.socket.on(EVENT_SEND_MESSAGE, (data) => {
      console.log(`${EVENT_SEND_MESSAGE} :`);
      return callback(data);
    });
  }

  listenReplay(callback = () => null) {
    this.socket.on(EVENT_SEND_REPLAY, (data) => {
      console.log(`${EVENT_SEND_REPLAY} :`);
      return callback(data);
    });
  }

  //========SERVICE STATIOS========

  listenUserConnection (callback = () => null) {
    this.socket.on("user_connected",(user=>{
      return callback(user)
    }))
  }

  listenNewMessage (callback = () => null) {
    
    this.socket.on("new_message",(message)=>{
      console.log('listenNewMessage message: ', message)
      return callback(message)
    })

  }

  listenUpdateStatus (callback = () => null) {
    this.socket.on("update-order-status",(order)=>{
      return callback(order)
    })
  }



  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: E M I T   E V E N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //


  emitUserConnection(userID) {
    this.socket.emit('user_connected', userID)
  }

  emitNewMessage(message) {
    this.socket.emit('message',message)
  }
  
  emitJoinGroup(groupId) {
    this.socket.emit('joinGroup',groupId)
  }

  emitGroupMessage(data){
    this.socket.emit("groupMessage",data)
  }
  
  
  emitUpdateStatus(data) {
    this.socket.emit('update-order-status',data)
  }
  
  

  //========END=============

  emitPrepareLiveStream({ userName, roomName }) {
    this.socket.emit(EVENT_PREPARE_LIVE_STREAM, { userName, roomName });
  }

  emitJoinRoom({ userName, roomName }) {
    this.socket.emit(EVENT_JOIN_ROOM, { userName, roomName });
  }

  emitLeaveRoom({ userName, roomName }) {
    this.socket.emit(EVENT_LEAVE_ROOM, { userName, roomName });
  }

  emitBeginLiveStream({ userName, roomName, userid }) {
    this.socket.emit(EVENT_BEGIN_LIVE_STREAM, { userName, roomName, userid });
  }

  emitFinishLiveStream({ userName, roomName }) {
    this.socket.emit(EVENT_FINISH_LIVE_STREAM, { userName, roomName });
  }

  // emitListLiveStream() {
  //   this.socket.emit(EVENT_LIST_LIVE_STREAM);
  // }

  emitSendHeart({ roomName }) {
    this.socket.emit(EVENT_SEND_HEART, { roomName });
  }

  emitSendMessage({ roomName, userName, message }) {
    this.socket.emit(EVENT_SEND_MESSAGE, { roomName, userName, message });
  }

  emitReplay({ roomName, userName }) {
    this.socket.emit(EVENT_SEND_REPLAY, { roomName, userName });
  }
  
  // custom
  emitJoinLiveStream({room,username, image}) {
    this.socket.emit('joinRoom', {username,room,image})
  }

  emitLiveMesssage(msg){
    this.socket.emit("chatMessage", msg)
  }
  
  emitCandidate(candidate){
    this.socket.emit("candidate", candidate)
  }
  emitOfferOrAnswer(data){
    this.socket.emit("offerOrAnswer", data)
  }

  emitIsUserOnline(data) {
    this.socket.emit('isUserOnline',data)
  }
  
  listenLiveGroupMessage(callback = () => null){
    this.socket.on('groupMessage', callback)
  }

  listenIsUserOnline(callback = ()=> null) {
    this.socket.on('isUserOnline',callback)
  }

  listenRoomOldMessages(callback = ()=> null){
    this.socket.on('getRoomMessages',callback)
  }

  listenGreeting(callback = () => null){
    this.socket.on('message', callback)
  }

  listenLiveMessage(callback = () => null){
    this.socket.on('message', callback)
  }

  listenCandidate(callback = () => null ){
    this.socket.on('candidate',callback)
  }
  
  listenOfferOrAnswer(callback = () => null ){

    this.socket.on('offerOrAnswer',callback)
  }

  /**
   * AGORA SOCKET HANDELERS
   */

  emitListLiveStream() {
    this.socket.emit("listLiveStream");
  }
  emitRemoveLiveStream(ID) {
    this.socket.emit("removeLiveStream",ID);
  }
  
  

  listenListLiveStream(callback = () => null) {
    this.socket.on("listLiveStream", (data) => {
      return callback(data);
    });
  }

  emitGoLive(data){
    this.socket.emit("goLive", data) 
  }
  
  listenGoLiveStream(callback = () => null) {
    this.socket.on("goLive",callback);
  }
  
  
  emitUserJoined(data){
    this.socket.emit("userJoined", data) 
  }
  
  listenUserJoined(callback = () => null) {
    this.socket.on("userJoined",callback);
  }


  

  // listenIsLive(callback = () => null){
  //   this.socket.on('isLive',callback)
  // }

  

}

const instance = new SocketManager();
Object.freeze(instance);

export default SocketManager;
