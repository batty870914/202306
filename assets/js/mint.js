$(function() {
	$("#mint").click(async () => {
console.log(provider)


            
        try{

			const nameElement = document.getElementById("amount");
			const amount = nameElement.value;
			console.log(amount)
			const decimals = 2; //代幣合約設定的小數點位數
			const valueInUnits = ethers.utils.parseUnits(amount, decimals);

			var smaddress = '0x270f246db3f4cfa7bf6fc8f4e414faf5f68e7ee5';

			const contractInstance = new ethers.Contract(smaddress, abi, provider.getSigner());

			const amountToBuy = ethers.utils.parseEther('0.08').mul(valueInUnits); // 購買數量（以 ETH 為單位，此處為 1 ETH）

			// 呼叫合約的 transfer 函數進行購買
			const tx = await contractInstance.transfer(account, amountToBuy,{ gasLimit: 200000 });
			  
			// 等待交易確認
			await tx.wait();
				  
			console.log('交易成功！');
			Swal.fire( "Success" ,  "successful transaction!" ,  "success" );
					
		} catch (error) {
			console.error('交易出錯：', error);
			// 這裡可以顯示一個訊息，告訴用戶交易出錯
			Swal.fire("Error", error.message, "error");
		}
    });


	  const minusBtn = document.querySelector('.minus-btn');
	  const plusBtn = document.querySelector('.plus-btn');
	  const quantityField = document.querySelector('[name="quantity"]');
	   minusBtn.addEventListener('click', function(e) {
		e.preventDefault();
		let currentQuantity = parseFloat(quantityField.value);
		if (currentQuantity > 0.1) {
			currentQuantity -= 0.1;
		}
		quantityField.value = currentQuantity.toFixed(2); 
		setTotal();
	  });  
	  plusBtn.addEventListener('click', function(e) {   
		e.preventDefault();
		let currentQuantity = parseFloat(quantityField.value);
		currentQuantity += 0.1;
		quantityField.value = currentQuantity.toFixed(2); 
		setTotal();
	  });

	function setTotal(){
		$("#showPrice").html("Total Price:"+(parseFloat(quantityField.value)*0.08).toFixed(3)+"ETH");//toFixed()是保留小數點的函式很實用哦
    }
    //初始化
    setTotal();
});