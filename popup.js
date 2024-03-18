document.addEventListener('DOMContentLoaded', function() {
  const notepad = document.getElementById('notepad');

  // 저장된 노트 내용 로드
  chrome.storage.sync.get('notepad', function(data) {
      notepad.value = data.notepad || '';
  });

  // 텍스트 변경시 실시간 저장
  notepad.addEventListener('input', function() {
      chrome.storage.sync.set({notepad: notepad.value});
  });
});

// 스토리지 변경 감지 및 내용 업데이트
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      if (key === 'notepad') {
          document.getElementById('notepad').value = newValue;
      }
  }
});
