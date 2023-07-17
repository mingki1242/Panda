package com.example.panda.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPurchaseHistoryEntity is a Querydsl query type for PurchaseHistoryEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPurchaseHistoryEntity extends EntityPathBase<PurchaseHistoryEntity> {

    private static final long serialVersionUID = 2075471696L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPurchaseHistoryEntity purchaseHistoryEntity = new QPurchaseHistoryEntity("purchaseHistoryEntity");

    public final NumberPath<Integer> pid = createNumber("pid", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> purchase_date = createDateTime("purchase_date", java.time.LocalDateTime.class);

    public final QUserEntity userEntity;

    public final QWritingCompleteEntity writingCompleteEntity;

    public QPurchaseHistoryEntity(String variable) {
        this(PurchaseHistoryEntity.class, forVariable(variable), INITS);
    }

    public QPurchaseHistoryEntity(Path<? extends PurchaseHistoryEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPurchaseHistoryEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPurchaseHistoryEntity(PathMetadata metadata, PathInits inits) {
        this(PurchaseHistoryEntity.class, metadata, inits);
    }

    public QPurchaseHistoryEntity(Class<? extends PurchaseHistoryEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userEntity = inits.isInitialized("userEntity") ? new QUserEntity(forProperty("userEntity")) : null;
        this.writingCompleteEntity = inits.isInitialized("writingCompleteEntity") ? new QWritingCompleteEntity(forProperty("writingCompleteEntity"), inits.get("writingCompleteEntity")) : null;
    }

}

