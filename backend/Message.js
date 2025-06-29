const Message = class {
  constructor() {

    this.message = {
      'error': {
        '404': 'Not Found',                 
        '500': 'Internal Server Error'      
      },
      'info': {
        '1000': 'Process satisfactorily completed', 
      },
      'debug': {},    
      'warning': {}   
    };
  }

  getMessage(type, code) {
    return this.message[type][code];
  }
}

export default Message;