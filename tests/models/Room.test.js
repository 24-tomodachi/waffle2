const supabase = require('../../src/libs/supabase');
const RoomModel = require('../../src/models/Room');

describe('RoomModel', () => {
  const name = "testRoom";
  const userId = "testUser";

  describe("Room#create", () => {
    // 正常系
    it("正常なルーム名と作成者のidが渡された場合、問題なく登録できる", async () => {
      
      // delete before
      await supabase.from('rooms').delete().match({name: name});
      
      // act
      const room = await RoomModel.create(name, userId);
      
      // assert
      expect(room).not.toBeNull();
      expect(room.name).toBe(name);
      expect(room.created_by).toBe(userId);

      // delete after
      await supabase.from('rooms').delete().match({name: name});
    })
  })
});