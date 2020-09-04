interface Position {
    x: number;
    y: number;
}

type DeltaType = -1 | 1;

interface Delta {
    x: DeltaType;
    y: DeltaType;
}

declare const window: Window;

const checkCollission = (currentPosition: Position, currentDelta: Delta): Delta => {
    let x = currentDelta.x;
    let y = currentDelta.y;

    if (currentPosition.x >= innerWidth) {
        x = -1;
    } else if (currentPosition.x <= 0) {
        x = 1;
    }

    if (currentPosition.y >= innerHeight) {
        y = -1;
    } else if (currentPosition.y <= 0) {
        y = 1;
    }

    return {
        x,
        y,
    };
};

const step = (timestamp: number, element: HTMLElement, velocity: number, delta: Delta) => {
    const offsetX = element.offsetLeft;
    const offsetY = element.offsetTop;

    const newDelta = checkCollission(
        {
            x: offsetX + (delta.x > 0 ? element.offsetWidth : 0),
            y: offsetY + (delta.y > 0 ? element.offsetHeight : 0),
        },
        delta
    );

    const newOffsetX = offsetX + newDelta.x * velocity;
    const newOffsetY = offsetY + newDelta.y * velocity;

    element.style.top = `${newOffsetY}px`;
    element.style.left = `${newOffsetX}px`;

    window.requestAnimationFrame(nextTimestamp => {
        step(nextTimestamp, element, velocity, newDelta);
    });
};

export const abuseDvdAnimation = (element: HTMLElement) => {
    const velocity = 25;
    const delta: Delta = {
        x: -1,
        y: -1,
    };

    element.style.position = 'fixed';
    element.style.zIndex = '999999999';

    window.requestAnimationFrame(timestamp => {
        step(timestamp, element, velocity, delta);
    });
};

