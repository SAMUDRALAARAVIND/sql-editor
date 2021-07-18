
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as ace from "ace-builds";
import { RestService } from "./rest.service";
@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  tableLayout =  false;
  fontSize = 14;
   loading = false;
  query = "SELECT * FROM users;"; 
  tableList = [];
  output: any ;
  table = [
      {name:"aravind" ,email:"email1", password:"nofnwof"},
      {name:"sjwdneu", email:"dmefoi", password:"mfioirjfr"},
      {name:"dkeoef", email:"deoiff", password:"fkrorifg"},
      {name:"fjriofgjrw", email:"froorg", passowrd:"frmjgg"}
  ];
  constructor(private restService: RestService){
    
  }
  consoleMessage(){
    console.clear();
    console.log("%c STOP READING","color:red;font-size:30px")
  }
  ngOnInit(){
    setTimeout(this.consoleMessage, 1000);
    
    this.restService.getTables()
    .subscribe((data: any)=>{
      this.tableList = []
      if(data.status === "error"){
        this.tableList.push("Error Occured");
      }
      else{
        for(let i=0;i<data.data.length;i++){
          if(data.data[i].Tables_in_b0pvcyaxjphwkhrcfnkl === "api") continue;
          this.tableList.push(data.data[i].Tables_in_b0pvcyaxjphwkhrcfnkl);
        }
      }
    })
  }
  
  ngAfterViewInit(): void {
    ace.config.set("fontSize", this.fontSize+"px");
    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue("SELECT * FROM users;");
    aceEditor.setTheme("ace/theme/sqlserver");
    aceEditor.session.setMode("ace/mode/sql");
    aceEditor.on("change", () => {
         this.query = aceEditor.getValue();
     });
  }
  clearCode() {
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue("");
  }
  resetCode(){
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue("SELECT * FROM users;");
  }
  goToLink(url){
    window.open(url, "_blank");
  }
  executeQuery() {
      
     this.restService.executeQuery(this.query).subscribe((data: any)=>{
       this.table = data.data ;
       if(data.status === "success"){
            if(data.type === "read"){
              this.table = data.data ;
              this.printOutput();
            }
            else{
              this.printErrorMessage({type:"success", message:"Updated successfully"});
            }
       }
       else{
          if(data.type === "error"){
            this.printErrorMessage({type:"errorMessage", message:data.message.sqlMessage});
          }
          else{
            this.printErrorMessage({type:"errorMessage",message:"Do not try to delete tables (or) send multiquery sql"});
          }
       }
     })
  }

    printOutput() {
        //this.table object
        this.clearOutput();
        let keys = Object.keys(this.table[0])
        let n = keys.length ;
        let tableElement = document.createElement("table");
        let thead = document.createElement("thead");
        let trh = document.createElement("tr")
        for(let i=0;i<n;i++){
          let th = document.createElement("th");
          let textNode = document.createTextNode(keys[i]);
          th.appendChild(textNode);
          trh.appendChild(th);
        }
       thead.appendChild(trh);
        tableElement.appendChild(thead);
        let tbody = document.createElement("tbody")
        let k = this.table.length ;
        for(let i=0;i<k;i++){
          let tr = document.createElement("tr");
          for(let j =0;j<n;j++){
            let td = document.createElement("td");
            let textNode = document.createTextNode(this.table[i][keys[j]]);
            td.appendChild(textNode);
            tr.appendChild(td);
          }
          tbody.appendChild(tr);
        }
        tableElement.appendChild(tbody);
        tableElement.classList.add("table", "table-striped");
        tableElement.classList.add("table-bordered","output");

        let output = document.getElementById("output");
        output.appendChild(tableElement);
        //window.scrollTo(0,document.body.scrollHeight )
        document.getElementById("output").scrollIntoView();

    }
    clearOutput() {
      let output = document.getElementById("output");
      let child = output.lastElementChild ;
      while(child){
        output.removeChild(child);
        child = output.lastElementChild;
      }
    }

    printErrorMessage(response: any) {
      this.clearOutput();
      let p = document.createElement("div");
      let textNode = document.createTextNode(response.message);
      p.appendChild(textNode);
      let output = document.getElementById("output");
      p.classList.add(response.type);
      output.appendChild(p);
      document.getElementById("output").scrollIntoView();
    }
  
}