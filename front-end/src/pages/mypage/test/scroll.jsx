import React from 'react';

const ScrollingDiv = () => {
  return (
    <div style={{ width: '300px', height: '200px', border: '1px solid black', overflow: 'auto' }}>
      {/* div 안에 많은 내용 */}
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit non mi eget volutpat.
        In consequat dolor eget sapien egestas, vitae tempor enim blandit. Nulla facilisi. Nullam eu erat sit amet 
        nibh facilisis facilisis. Vivamus in justo vel metus tincidunt sollicitudin et non justo. Donec maximus 
        lectus id erat lacinia tincidunt. Integer maximus, ipsum non malesuada congue, felis elit congue odio, 
        a vulputate purus elit at nunc. Sed cursus tellus in lorem venenatis, sit amet aliquet est pellentesque.
        Integer ut nisi lectus. Fusce euismod arcu sed scelerisque dapibus.</p>
      {/* 내용이 많이 길어질 경우 스크롤이 생성됩니다. */}
    </div>
  );
};

export default ScrollingDiv;