import { renderHook } from "@testing-library/react";
import { act } from "react";
import { usePostMessage } from "../use-post-message";

describe("usePostMessage", () => {
  it("should call callback when message event is received", () => {
    const callback = vi.fn();

    renderHook(() => usePostMessage<{ userId: number }>(callback));

    act(() => {
      const event = new MessageEvent("message", {
        data: { userId: 123 },
        origin: "http://localhost",
      });
      window.dispatchEvent(event);
    });

    expect(callback).toHaveBeenCalledWith(
      { userId: 123 },
      expect.any(MessageEvent)
    );
  });

  it("should not call callback if origin does not match", () => {
    const callback = vi.fn();

    renderHook(() =>
      usePostMessage<{ foo: string }>(callback, {
        origin: "http://allowed.com",
      })
    );

    act(() => {
      const event = new MessageEvent("message", {
        origin: "http://malicious.com",
        data: { foo: "bar" },
      });
      window.dispatchEvent(event);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("should clean up event listener on unmount", () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => usePostMessage(callback));

    unmount();

    act(() => {
      const event = new MessageEvent("message", {
        data: { test: true },
        origin: "http://localhost",
      });
      window.dispatchEvent(event);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
