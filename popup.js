document.addEventListener('DOMContentLoaded', function() {
  const saveButton = document.getElementById('saveButton');
  const loadButton = document.getElementById('loadButton');
  const notepad = document.getElementById('notepad');

  // "쓰기" 버튼 이벤트 리스너
  saveButton.addEventListener('click', function() {
      const noteContent = notepad.value;
      chrome.storage.sync.set({notepad: noteContent}, function() {
          console.log('노트가 저장되었습니다.');
      });
  });

  // "읽기" 버튼 이벤트 리스너
  loadButton.addEventListener('click', function() {
      chrome.storage.sync.get('notepad', function(data) {
          notepad.value = data.notepad || '';
          console.log('노트를 불러왔습니다.');
      });
  });
});
