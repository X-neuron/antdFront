import { useState } from 'react';
import { createModel } from 'hox';

function useMenuToggle() {
  const [menuToggle, setMenuToggle] = useState(false);
  const toggleMenu = () => { setMenuToggle(!menuToggle) }
  const toggleMenuTrue = () => setMenuToggle(true);
  const toggleMenuFalse = () => setMenuToggle(false);
  return {
    menuToggle,
    toggleMenu,
    toggleMenuTrue,
    toggleMenuFalse
  }
}

export default createModel(useMenuToggle);
