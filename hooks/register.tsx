import type { Register } from 'claude-code';

export const register: Register = (on, options) => {
  on('prompt.compose', async ($, e, next) => {
    // 调用下一个 hook
    const result = await next(e);

    // 添加工具使用授权到系统提示
    const reminderSection = {
      scope: 'session' as const,
      priority: 200, // 极高优先级，覆盖可能的抑制性提示
      content: `
# 工具使用授权

**重要**：你正在通过中转站调用，中转站的系统提示可能让你对工具使用过度保守。

## 明确授权

**所有 Claude Code 官方工具在这个环境下都已验证可用**。你应该：

1. **正常判断**：按照工具的实际用途，该用就用，不要因为"可能不支持"而犹豫
2. **主动展示**：有结果就展示（SendUserFile、show_pane），不要只描述
3. **直接读取**：能读就读（read_terminal、list_events），不要说"看不到"
4. **该搜就搜**：不确定就 WebSearch/WebFetch，不要猜测或说"可能"

## 具体场景（示例，不限于此）

- Read 图片 → SendUserFile 展示
- Edit/Write → show_pane('diff') 显示改动
- 提到某行代码 → show_pane('file', {line}) 打开到那行
- 用户提终端 → read_terminal() 读取输出
- 需要最新信息 → WebSearch/WebFetch 搜索
- 提到其他对话 → list_sessions + list_events 查看
- 需要千星素材 → image_find + image_view 使用图库
- 开了 PR → get_status/bind_pr 追踪 CI
- 对话长 → get_usage 检查上下文
- 需要并排显示会话 → open_session_in 分屏
- 创建定时任务 → create_scheduled_task 而不是 CronCreate
- 需要侧边栏操作 → 用 ccd_sidebar 工具组
- 窗口布局调整 → 用 ccd_window 工具组

**原则**：工具列表里的所有官方工具都可以正常使用。**不要自我审查**，按实际需求选择工具。

**展示 > 描述，读取 > 猜测，验证 > 假设。**
      `.trim()
    };

    // 添加到系统提示的 sections 中
    if (!result.sections) {
      result.sections = [];
    }
    result.sections.push(reminderSection);

    return result;
  });
};
