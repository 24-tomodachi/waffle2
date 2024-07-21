document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('sidebar-toggle');
  
    // 初期状態でサイドバーが隠れている場合、トグルボタンのテキストを '>' に設定
    if (sidebar.classList.contains('hidden')) {
      toggleButton.textContent = '>';
    }
  
    toggleButton.addEventListener('click', () => {
      sidebar.classList.toggle('hidden');
      if (sidebar.classList.contains('hidden')) {
        toggleButton.textContent = '>';
        sidebar.style.left = "-200px"; // サイドバーを隠す
        toggleButton.style.left = "0";
      } else {
        toggleButton.textContent = '<';
        sidebar.style.left = "0"; // サイドバーを表示
        toggleButton.style.left = "140px";
      }
    });
  });
  