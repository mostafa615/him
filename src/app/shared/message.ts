

export class Message {

    public static success(message: string) {
      let doc: any = document;
      doc.playSound('not2');
      doc.swal.success(message);
      //
      //AppModule.doc.observeNotification();
    }

    public static error(message: string) {
      let doc: any = document;
      doc.playSound('not2');
      doc.swal.error(message);
      //
      //AppModule.doc.observeNotification();
    }

    public static confirm(message: string, action: any, nothing: any=null) {
      let doc: any = document;
      doc.swal.confirm(message, action, nothing);
    }

    public static warning(message: string, title: string, action:any=null) {
      let doc: any = document;
      doc.playSound('not2');
      doc.Swal.fire(
        "<b class='w3-text-red w3-xlarge' >" + title + "</b>",
        "<b class='w3-text-red w3-large' >" + message + "</b>",
        'warning'
      ).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          action? action() : null;
        } else if (result.isDenied) {

        }
      });
    }
}
