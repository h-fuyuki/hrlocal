let addBtn = document.querySelector(".add-btn");
let dialogBox = document.querySelector('.modal');
let closeBtn = document.querySelector('.close-icon');


//bắt sự kiện click chuột của button Add Employee
addBtn.onclick = () => {
    showDialogToAddNew();
}

// bắt sự kiện click chuột của nút đóng cửa số dialog box (hay còn gọi là modal)
closeBtn.addEventListener('click', () => {
    dialogBox.classList.remove('active')
})


/* DialogBox */
let userData = [];
let idVar = document.getElementById('id');
let nameVar = document.getElementById('name');
let lastNameVar = document.getElementById('last-name');
let emailVar = document.getElementById('e-mail');
let officeVar = document.getElementById('office-code');
let jobTitleVar = document.getElementById('job-title');
let currentIndexVar = document.getElementById('current_index');


let updateVar = document.querySelector('.update-btn');
let registerVar = document.querySelector('.register-btn');
let registerForm = document.querySelector('#register-form');

registerVar.onclick = function (e) {
    e.preventDefault();
    registrationData();
    getDataFromLocal();

    closeBtn.click();
};

updateVar.onclick = function (e) {
    e.preventDefault();
    updateData();
    getDataFromLocal();

    closeBtn.click();
}


// check xem localStorage có userData không?
// nếu có thì lấy giá trị userData và parse theo JSON format và console log giá trị userData đó.
if (localStorage.getItem('userData') != null) {
    userData = JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
}


function getFormData(){
    return {
        id: idVar.value,
        name: nameVar.value,
        last_name: lastNameVar.value,
        email: emailVar.value,
        office_code: officeVar.value,
        jobtitle: jobTitleVar.value,
        profilePic: profilePic.src === undefined ? 'avatar.png' : profilePic.src
    }
}

function registrationData() {
    // userData là 1 array
    // add thêm 1 phần tử vào array userData
    userData.push(getFormData());

    // convert userData thành 1 chuỗi string theo format JSON
    let userString = JSON.stringify(userData);

    // lưu chuỗi string đó vào localStorage
    localStorage.setItem('userData', userString);

    // hiển thị thông báo cho người dùng
    swal("Good job!", "You clicked the button!", "success");
}

function updateData() {
    let index = currentIndexVar.value;
    userData[index] = getFormData();

    // convert userData thành 1 chuỗi string theo format JSON
    let userString = JSON.stringify(userData);

    // lưu chuỗi string đó vào localStorage
    localStorage.setItem('userData', userString);

    // hiển thị thông báo cho người dùng
    swal("Good job!", "You clicked the button!", "success");
}

/** Trả dữ liệu vào bảng tính
 * setItem():  localStorage.setItem('key', 'value')

 LocalStorage chỉ cho phép chúng ta lưu biến với kiểu String
 Dữ liệu phía trên có dạng String vì vậy
 khi lưu vào localstoreage có dạng
 localStorage.setItem('userData',userString)

 Key: userData
 Value: id,name,last_name, email, office_code, jobtitle, profilePic
 Nếu nhập lần 2
 Key:userData
 Value:[{ id,name,last_name, email, office_code, jobtitle, profilePic},{ id,name,last_name, email, office_code, jobtitle, profilePic}]


 Object==>JSON.stringify==>JSON.parse==>Object

 */


/**parentElement trong javascript,
 * qua đó sẽ giúp bạn lấy được thẻ html parent của thẻ html hiện tại. */

/**
 * Get data về bảng
 * userData.forEach (userDAta lúc này là array nên dùng hàm forEach)
 * userData.forEach((data,index)
 * ==> Data là 1 chuỗi [{ id,name,last_name, email, office_code, jobtitle, profilePic}]
 *
 */



let tableData = document.querySelector('#table-data')
const getDataFromLocal = () => {
    tableData.innerHTML = '';
    for (let index = 0; index < userData.length; index++) {
        let data = userData[index];
        // chèn 1 dòng trong table
        tableData.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${data.profilePic}" width='40' height='40'></td>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.last_name}</td>
                <td>${data.email}</td>
                <td>${data.office_code}</td>
                <td>${data.jobtitle}</td>
                <td>
                    <button class='edit-btn' data-index='${index}'><i class="fa fa-eye"></i></button>
                    <button class="del-btn" data-index='${index}'><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        `
    }

    let listEditBtn = document.querySelectorAll('.edit-btn');
    listEditBtn.forEach(function (editBtn){
        // bắt sự kiện cho từng nút view
        editBtn.onclick = function (){
            let data_index = editBtn.getAttribute('data-index');
            console.log('Edit index: ', data_index);
            showDialogToUpdate(data_index);
        }
    });

    let listDeleteBtn = document.querySelectorAll('.del-btn');
    listDeleteBtn.forEach(function (delBtn){
        // bắt sự kiện cho từng nút delete
        delBtn.onclick = function (){
            let data_index = parseInt(delBtn.getAttribute('data-index'));


            // remove phần từ thứ data_index trong array userData
            userData.splice(data_index, 1);

            // lưu lại array userData vào localStorage
            localStorage.setItem('userData', JSON.stringify(userData));

            // remove dòng trong table
            let tr = delBtn.parentElement.parentElement;
            tr.remove();
        }
    });

}
getDataFromLocal();

/** Lấy hình ảnh */
let profilePic = document.querySelector('#profile-pic');
let uploadPic = document.querySelector('#upload-file');
uploadPic.onchange = function () {
    if (uploadPic.files[0].size < 1000000) {
        let fReader = new FileReader();
        fReader.onload = function () {
            let imgUrl = fReader.result;
            profilePic.src = imgUrl;
            console.log(imgUrl);
        }
        fReader.readAsDataURL(uploadPic.files[0]);
    } else {
        alert('file is too big')
    }
}
/**gán onchange vào element chứa type='file'
 * Khi bấm change vào mục file thì thực hiện function;
 * var 1 biến gán biến đó với file reader. Ý nghĩa: Biến này có thể đọc file
 -------const reader = new FileReader();-----
 * load vào biến đó sau khi có file qua onload
 --------reader.addEventListener('load',() -------------------------
 * đồng thời chạy 1 function để cho ra kết quả uploaded_image = reader.result;
 *
 * Và hiển thị lên hình vuông hiển thị bằng hàm style
 document.querySelector('#display_image'). style.backgroundImage=`url(${uploaded_image})`;
 document.querySelector('#display_image'). style.backgroundSize = 'cover';
 Cuối cùng dùng readAsDataURL
 */

/** Delete nút */
var i;
var allDelBtn = document.querySelectorAll('.del-btn');
for (i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].onclick = function () {
        var tr = this.parentElement.parentElement;
        var id = tr.getAttribute('index');
        userData.splice(id, 1);
        localStorage.setItem('userData', JSON.stringify(userData));
        tr.remove();

    }
}

function resetDialog(){
    registerForm.reset();
    profilePic.src = 'avatar.png';
}

function showDialogToAddNew() {
    resetDialog();
    document.querySelector('.register-btn').style.visibility = 'visible';
    document.querySelector('.update-btn').style.visibility = 'hidden';
    dialogBox.classList.add('active');
}

function showDialogToUpdate(index) {
    resetDialog();
    let currentRecord = userData[index];

    currentIndexVar.value = index;
    idVar.value = currentRecord.id;
    nameVar.value = currentRecord.name;
    lastNameVar.value = currentRecord.last_name;
    emailVar.value = currentRecord.email;
    officeVar.value = currentRecord.office_code;
    jobTitleVar.value = currentRecord.jobtitle;
    profilePic.src = currentRecord.profilePic;

    document.querySelector('.register-btn').style.visibility = 'hidden';
    document.querySelector('.update-btn').style.visibility = 'visible';
    dialogBox.classList.add('active');
}