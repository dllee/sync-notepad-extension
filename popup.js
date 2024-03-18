document.addEventListener('DOMContentLoaded', function() {
  const notepad = document.getElementById('notepad');

  // 텍스트 변경시 실시간 저장
  notepad.addEventListener('input', function() {
      chrome.storage.sync.set({notepad: notepad.value});
  });

  // 저장된 노트 내용 로드
  chrome.storage.sync.get('notepad', function(data) {
      notepad.value = data.notepad || '';
  });
});
