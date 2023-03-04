

describe('handleTimeUpdate', () => {
  it('should set isVideoVisible to true when videoEl.current.currentTime is equal to videoEl.current.duration', () => {
    const videoEl = {
      current: {
        currentTime: 10,
        duration: 10,
      },
    };

    const setIsVideoVisible = jest.fn();

    handleTimeUpdate(videoEl, setIsVideoVisible);

    expect(setIsVideoVisible).toHaveBeenCalledWith(true);
  });

  it('should set isVideoVisible to false when taim is equal to 0', () => {
    const videoEl = {
      current: {
        currentTime: 0,
        duration: 10,
      },
    };

    const setIsVideoVisible = jest.fn();

    handleTimeUpdate(videoEl, setIsVideoVisible);

    expect(setIsVideoVisible).toHaveBeenCalledWith(false);
  });

  it('should set progress correctly', () => {
    const videoEl = {
      current: {
        currentTime: 5,
        duration: 10,
      },
    };

    const setProgress = jest.fn();

    handleTimeUpdate(videoEl, null, setProgress);

    expect(setProgress).toHaveBeenCalledWith(50); // 50% of the total duration (5/10 * 100) 
  });  									   