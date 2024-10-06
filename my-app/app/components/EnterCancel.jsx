"use client";

import Swal from 'sweetalert2';

const EnterCancle = () => {
  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Cancelled!',
          'Your action has been cancelled.',
          'success'
        );
      }
    });
  };

  const handleEnter = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Your action has been successfully submitted!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div className="flex items-center justify-center gap-4 py-7">
      <button 
        onClick={handleCancel} 
        className="bg-red-500 hover:bg-red-600 w-1/5 p-2 rounded-lg text-center font-semibold"
      >
        <h1>Cancel</h1>
      </button>
      <button 
        onClick={handleEnter} 
        className="bg-green-500 hover:bg-green-600 w-1/5 p-2 rounded-lg text-center font-semibold"
      >
        <h1>Enter</h1>
      </button>
    </div>
  );
};

export default EnterCancle;
