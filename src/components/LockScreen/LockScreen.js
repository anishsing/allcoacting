import React, { Fragment, useState, useEffect, useRef } from 'react';
 
// import PropTypes from 'prop-types';

function LockScreen(props) {
  const [isLocked, setLock] = useState(props.isLocked);
  const init = useRef(0);

  const handleOnIdle = () => {
    if (!isLocked) {
      setLock(!isLocked);
    }
  };

  useEffect(() => {
      setLock(props.isLocked);
  },[props.isLocked])
  
  useEffect(() => {
    if (!init.current) {
      init.current = 1;
      return;
    }
    isLocked ? props.onScreenLocked() : props.onScreenUnlocked();
  }, [isLocked]);

  const renderLockScreenUi = () => {
    if (isLocked) return props.ui(setLock);
  };

  const defaultLockScreenStyles = () =>
    isLocked && !props.className
      ? {
          filter: 'blur(4px)',
          userSelect: 'none',
          height: '100vh',
          overflow: 'hidden'
        }
      : {};
console.log(isLocked," ",props.isLocked," isLocked")
  return (
    <Fragment>
      
      <div
        style={defaultLockScreenStyles()}
        className={`react-lock-screen ${isLocked ? props.className : ''}`}
      >
        {props.children}
      </div>
      {renderLockScreenUi()}
    </Fragment>
  );
}

LockScreen.defaultProps = {
  onScreenLocked: () => {},
  onScreenUnlocked: () => {}
};

// LockScreen.propTypes = {
//   timeout: PropTypes.number.isRequired,
//   ui: PropTypes.func.isRequired,
//   className: PropTypes.string,
//   onScreenLocked: PropTypes.func,
//   onScreenUnlocked: PropTypes.func
// };

export default LockScreen;