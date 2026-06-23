import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useSmartContract } from "./useSmartContract";

// Mock useWeb3 hook
vi.mock("./useWeb3", () => ({
  useWeb3: () => ({
    address: "0x1234567890123456789012345678901234567890",
    isConnected: true,
  }),
}));

describe("useSmartContract", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with correct state", () => {
    const { result } = renderHook(() => useSmartContract());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.txHash).toBeNull();
  });

  it("should approve USDC successfully", async () => {
    const { result } = renderHook(() => useSmartContract());

    let approveResult;
    await act(async () => {
      approveResult = await result.current.approveUSDC("1000");
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(approveResult).toBeDefined();
    expect(approveResult?.success).toBe(true);
    expect(approveResult?.message).toContain("Approved");
  });

  it("should deposit to escrow successfully", async () => {
    const { result } = renderHook(() => useSmartContract());

    const milestones = [
      { name: "Milestone 1", percentage: 50 },
      { name: "Milestone 2", percentage: 50 },
    ];

    let depositResult;
    await act(async () => {
      depositResult = await result.current.depositToEscrow(1, "1000", milestones);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(depositResult).toBeDefined();
    expect(depositResult?.success).toBe(true);
    expect(depositResult?.jobId).toBe(1);
    expect(depositResult?.amount).toBe("1000");
  });

  it("should release payment successfully", async () => {
    const { result } = renderHook(() => useSmartContract());

    let releaseResult;
    await act(async () => {
      releaseResult = await result.current.releasePayment(
        1,
        "0xfreelancer",
        "500"
      );
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(releaseResult).toBeDefined();
    expect(releaseResult?.success).toBe(true);
    expect(releaseResult?.message).toContain("Released");
  });

  it("should commit deliverable hash successfully", async () => {
    const { result } = renderHook(() => useSmartContract());

    let commitResult;
    await act(async () => {
      commitResult = await result.current.commitDeliverableHash(
        1,
        "QmXxxx..."
      );
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(commitResult).toBeDefined();
    expect(commitResult?.success).toBe(true);
    expect(commitResult?.ipfsHash).toBe("QmXxxx...");
  });

  it("should vote on dispute successfully", async () => {
    const { result } = renderHook(() => useSmartContract());

    let voteResult;
    await act(async () => {
      voteResult = await result.current.voteOnDispute(1, "freelancer");
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(voteResult).toBeDefined();
    expect(voteResult?.success).toBe(true);
    expect(voteResult?.vote).toBe("freelancer");
  });

  it("should update reputation successfully", async () => {
    const { result } = renderHook(() => useSmartContract());

    let updateResult;
    await act(async () => {
      updateResult = await result.current.updateReputation("0xuser", 95);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(updateResult).toBeDefined();
    expect(updateResult?.success).toBe(true);
    expect(updateResult?.score).toBe(95);
  });
});
