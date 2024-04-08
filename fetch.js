import fetch from 'node-fetch';

fetch('https://api.thedogapi.com/v1/breeds')
  .then(response => response.json())
  .then(async data => {
    // [1] 전체 데이터
    console.log(data);
    // [2] 전체 데이터에서 키(name)에 해당하는 값 출력
    const name = data.map(item => item.name);
    console.log(name);
    // [3] 전체 데이터에서 키(id와 name)에 해당하는 값 출력
    const idAndName = data.map(item => ({id: item.id, name: item.name}));
    console.log(idAndName);
    // [4] 각 요소에 해당하는 이미지 출력 (데이터 한 번에 한 개씩 반환)
    // let images = [];
    // for (const item of data) {
    //   const result = {
    //     id: item.id,
    //     name: item.name,
    //     image_url: await getImageFromImageId(item.reference_image_id)
    //   }
    //   console.log(result);
    //   images.push(result);
    // }
   // console.log(images);
   // })
    // [5] 각 요소에 해당하는 이미지 출력 (데이터 한 번에 반환)
    const promiseImage = data.map(item => new Promise((resolve, reject) => {
      getImageFromImageId(item.reference_image_id)
      .then((imageUrl) => {
        resolve({
          Id: item.id,
          Name: item.name,
          Image_Url: imageUrl
        })
      })
  }))
    return Promise.all(promiseImage);

  })
  


  .catch(error => console.log(error))



// async function getImageFromImageId(referenceImageId){
//   try {
//     const referenceImage = await fetch(`https://api.thedogapi.com/v1/images/${referenceImageId}`)
//     const imageData = await referenceImage.json();
//     console.log(imageData);  
//     return imageData.url
  
//   } catch (error) {
//     console.error('오류 발생', error);
//     return null;
//   }

}