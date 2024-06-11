const supabase = require('../../src/libs/supabase');
const RoomModel = require('../../src/models/Room');

describe('RoomModel', () => {
  const name = "testRoom";
  const userId = 1;

  describe("Room#create", () => {
    // 正常系
    it("正常なルーム名と作成者のidが渡された場合、問題なく登録できる", async () => {
      
      // delete before
      await supabase.from('rooms').delete().match({ name: name });
      
      // act
      const room = await RoomModel.create(name, userId);
      
      // assert
      expect(room).not.toBeNull();
      expect(room.name).toBe(name);
      expect(room.user_id).toBe(userId);

      // delete after
      await supabase.from('rooms').delete().match({ name: name });
    })
  })

  describe("Room#findById", () => {
    // 正常系
    it("idが存在する場合、問題なく取得できるか", async () => {
      // テストデータは seed.js で登録済みとする
      const id = 1;
      const userId = 1;
      const name = "Room 1";
      const description = "Room 1 description";

      // act
      const result = await RoomModel.findById(id);

      // assert
      expect(result).not.toBeNull();
      expect(result.id).toBe(id);
      expect(result.name).toBe(name);
      expect(result.description).toBe(description);
    })
  });
});