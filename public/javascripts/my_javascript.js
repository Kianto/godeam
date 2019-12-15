function Edit(){
    //alert("Hello");
    document.getElementById("Name_info").disabled= false;
    document.getElementById("Name_info").focus();
    document.getElementById("Email_info").disabled= false;
    document.getElementById("Phone_info").disabled= false;
    document.getElementById("Address_info").disabled= false;

    //document.getElementById("btn_edit_info").type = "submit";
    document.getElementById("btn_edit_info").innerHTML= "Cập nhật thông tin";
    document.getElementById("btn_edit_info").addEventListener('click',Submit_edit);
  
}
  
function Submit_edit()
{
    document.getElementById("btn_edit_info").type = "submit";
}

